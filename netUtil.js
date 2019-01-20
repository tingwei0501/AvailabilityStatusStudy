let netUtil = {
    postJson(url, data, callback) {
        var fetchOptions = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            callback(responseText);
        }).catch((err) => {
            console.log('錯誤:', err);
        });
    },
}
export default netUtil;