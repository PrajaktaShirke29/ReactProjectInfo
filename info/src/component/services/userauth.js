class UserAuth{

    //verify login
    postData(prd){
    
        let promise=fetch("http://localhost:4080/api/users/auth",
        {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(prd)
        });
        
        return promise;
    }
    // verify in permanent users
    postPerData(prd){
    
        let promise=fetch("http://localhost:4080/api/users/permanent/auth",
        {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(prd)
        });
        
        return promise;
    }
    //Create new user record
    postUser(prd){
        let promise=fetch("http://localhost:4080/api/users/create",
        {
            method: "POST",
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify(prd)
        });
        return promise;
    }

    //Create Permanent
    postPermanentUser(prd){
        let promise=fetch("http://localhost:4080/api/users/create/permanent",
        {
            method: "POST",
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify(prd)
        });
        return promise;
    }
    //Update user record
    updateUser(id,prd){
        var t = localStorage.getItem("token");
        let promise=fetch(`http://localhost:4080/api/users/${id}`,
        {
            method: "PUT",
            headers:{
                "content-type":"application/json",
                "Authorization":t
            },
            body: JSON.stringify(prd)
        });
        return promise;
    }

    updatPerUser(id,prd){
        var t = localStorage.getItem("token");
        let promise=fetch(`http://localhost:4080/api/users/permanent/${id}`,
        {
            method: "PUT",
            headers:{
                "content-type":"application/json",
                "Authorization":t
            },
            body: JSON.stringify(prd)
        });
        return promise;
    }
    
    //Delete User profile data
    deletedUser(id){
        var t = localStorage.getItem("token");
        let promise=fetch(`http://localhost:4080/api/users/${id}`,
        {
            method: "DELETE",
            headers:{
                "content-type":"application/json",
                "Authorization":t
            },
          //  body: JSON.stringify(prd)
        });
        return promise;
    }

     //display user Profile info
     getUser(){
        var t = localStorage.getItem("token");
        let promise=fetch("http://localhost:4080/api/users",  {
            headers:{
                // "Content-Type":"application/json",
                "Authorization":t
            }
        });
        return promise;
    }

    //diaplay user Permanent Profile
    getPerUser(){
        var t = localStorage.getItem("token");
        let promise=fetch("http://localhost:4080/api/users/permanent",  {
            headers:{
                // "Content-Type":"application/json",
                "Authorization":t
            }
        });
        return promise;
    }

    //display personal info
    getData(){
        var t = localStorage.getItem("token");
        console.log(t);
        let promise=fetch("http://localhost:4080/api/info",  {
            headers:{
                // "Content-Type":"application/json",
                "Authorization":t
            }
        });
        return promise;
    }

    //display Parmanent personal info
    getPerData(){
        var t = localStorage.getItem("token");
        console.log(t);
        let promise=fetch("http://localhost:4080/api/info/permanent",  {
            method: "GET",
            headers:{
                // "Content-Type":"application/json",
                "Authorization":t
            }
        });
        return promise;
    }


    //display personal info using id
    getDataById(){
        var t = localStorage.getItem("token");
        console.log(t);
        console.log(localStorage.getItem("PersonalId"));
        var id = localStorage.getItem("PersonalId");
        let promise=fetch(`http://localhost:4080/api/info/permanent/${id}`,  {
            method: "GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":t
            }
        });
        return promise;
    }

    //Post personal information
    PostData(prd){
        var t = localStorage.getItem("token");
        let promise=fetch(`http://localhost:4080/api/info`,
        {
            method: "POST",
            headers:{
                "content-type":"application/json",
                "Authorization":t
            },
            body: JSON.stringify(prd)
        });
        return promise;
    }

       //update Permanant Personal information
    updateData(id,prd){
        var t = localStorage.getItem("token");
        let promise=fetch(`http://localhost:4080/api/info/permanent/${id}`,
        {
            method: "PUT",
            headers:{
                "content-type":"application/json",
                "Authorization":t
            },
            body: JSON.stringify(prd)
        });
        console.log(promise);
        return promise;
    }

    //Delete personal information
    deletedinfo(id){
        var t = localStorage.getItem("token");
        let promise=fetch(`http://localhost:4080/api/info/${id}`,
        {
            method: "DELETE",
            headers:{
                "content-type":"application/json",
                "Authorization":t
            },
          //  body: JSON.stringify(prd)
        });
        return promise;
    }

    //Post data in Permanent table
    PostInfoData(prd){
        var t = localStorage.getItem("token");
        let promise=fetch(`http://localhost:4080/api/info/permanent`,
        {
            method: "POST",
            headers:{
                "content-type":"application/json",
                "Authorization":t
            },
            body: JSON.stringify(prd)
        });
        return promise;
    }
 
    //Search
    Search(prd){
        var t = localStorage.getItem("token");
        let promise=fetch(`http://localhost:4080/api/info/permanent/search`,
        {
            method: "POST",
            headers:{
                "content-type":"application/json",
                "Authorization":t
            },
            body: JSON.stringify(prd)
        });
        return promise;
    }

}

export default UserAuth;