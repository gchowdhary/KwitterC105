//YOUR FIRE BASE LINKS
var firebaseConfig = {
  apiKey: "AIzaSyAaGvUt160C_Vl2R06tE9UfnvzSJVy4O3I",
  authDomain: "c93kwitter-ef219.firebaseapp.com",
  databaseURL: "https://c93kwitter-ef219-default-rtdb.firebaseio.com",
  projectId: "c93kwitter-ef219",
  storageBucket: "c93kwitter-ef219.appspot.com",
  messagingSenderId: "35667598944",
  appId: "1:35667598944:web:783b1691cd20c5aff9ed05"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        //Start code C105 **************************************************
        console.log(firebase_message_id); //-NgU2vgeiLun40GkIrxp
        console.log(message_data); //{like: 0, message: 'hello...', name: 'abcde'}
        name = message_data['name']; //pick from key
        message = message_data['message']; //pick from key
        like = message_data['like']; //pick from key
        name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        
        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + 
        " onclick='updateLike(this.id)'>";
        //this buttton has the id = unique message id from firebase
        // value=like gives the NUMBER of likes
        // when this button is clicked, it calls updateLike()
        
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like : " + like + 
        "</span></button><hr>";

        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
       }
    });
  });
}
getData();

function updateLike(message_id) {
  console.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;//store the present value of likes in likes var
  updated_likes = Number(likes) + 1; //increment the likes and save to updated_likes var
  console.log("incremented value of like :"+ updated_likes); 

  firebase.database().ref(room_name).child(message_id).update({ //update database with new value of like
    like: updated_likes
  });

}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("kwitter.html");
}

//End code C105***************************************