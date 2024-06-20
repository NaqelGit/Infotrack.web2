export async function getToken() {
    try {
        let token = await localStorage.getItem('token')
        if (token === undefined) {
            return "";
        }
        let tokenObj = JSON.parse(token);
        return tokenObj.token;
    }
    catch (exception) {
        return "";
    }

}