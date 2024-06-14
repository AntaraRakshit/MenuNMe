import {CognitoUserPool} from "amazon-cognito-identity-js"


const poolData = {
    UserPoolId: "ap-south-1_lqrPgwhXY",
    ClientId: "7o4l6f6p0jhd3g5fat04jgrplj"
}

export default new CognitoUserPool(poolData);