const AWS = require('aws-sdk');
const iotdata = new AWS.IotData({
    endpoint: process.env.AWS_IOT_ENDPOINT
});

exports.handler = async (event) => {
    const alert = event.queryStringParameters?.alert || event.body?.alert;
    const interval = event.queryStringParameters?.interval || event.body?.interval;
    const device_id = event.queryStringParameters?.device_id || event.body?.device_id;

    if (!alert || !interval || !device_id) {
        return {
            statusCode: 400,
            body: JSON.stringify('Missing required parameters')
        };
    }

    const params = {
        topic: 'room1/downlink',
        payload: JSON.stringify({
            device_id: device_id,
            alert: alert,
            interval: interval,
        }),
        qos: 0
    };

    try {
        await iotdata.publish(params).promise();
        console.log('Message published to topic');
        return {
            statusCode: 200,
            body: JSON.stringify('Message published successfully')
        };
    } catch (err) {
        console.error('Error publishing to topic:', err);
        return {
            statusCode: 500,
            body: JSON.stringify('Error publishing to topic: ' + err)
        };
    }
};
