export class UserLogin{
    userId:number;
    userName:string;
    userPwd:string;
    constructor(){

    }
    setUserId(userId:number){
          this.userId=userId;
    }
    getUserId(){
        return this.userId;
    }

    setUserName(userName:string){
        this.userName=userName;
    }
    getUserName(){
        return this.userName;
    }
    setUserPwd(userPwd:string){
        this.userPwd=userPwd;
    }
    getUserPwd(){
        return this.userPwd;
    }
}