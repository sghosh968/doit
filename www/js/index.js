/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var passPhrase = "b+&};}bT5+xKYx?}"
var app_views = ['login_page', 'main_menu', 'add_task_page', 'tasks_list']
var db, new_task, all_tasks, encryptedData, decryptedData;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //alert('In device ready event handler');

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        window.open = cordova.InAppBrowser.open;
        app.receivedEvent();
    },
    // Update DOM on a Received Event
    receivedEvent: function() {

        console.log("................Initializing deviceInfo variable............");
        var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");
        console.log("................deviceInfo variable Initialized : ............" + deviceInfo);
        deviceInfo.get(function(result) {
            console.log("In deviceInfo success block");
            alert("result = " + result);
        }, function() {
            console.log("In deviceInfo error block");
            alert("error");
        });

        // ****** Code related to sqlite DB ************
        db = window.sqlitePlugin.openDatabase({name: "doit.db", key: "000000"}, function(db){ console.log("DB variable assigned"); }, function(err){ console.log('Open database ERROR: ' + JSON.stringify(err)); });
        alert("db variable is" + JSON.stringify(db));

        // create table if it doesn't exists
        app.create_table();

        $('#add_task_button').click(function(){
          if($('#task_name').length && $('#task_status').length && $('#task_complete_by').length){
            new_task = {name: $('#task_name').val(), status: $('#task_status').val(), complete_by: $('#task_complete_by').val()}
            app.add_task(new_task);
          }
          else{
            alert("You must fill up all the fields to create a task");
          }
        });

        $('#get_tasks_button').click(function(){
          // db.transaction(function(transaction) {
          //   var executeQuery = "SELECT * FROM tasks";
          //   transaction.executeSql(executeQuery, [],
          //   function(tx, result) {
          //     alert('All tasks retrieved from database');
          //     alert("Retrieved data is " + JSON.stringify(result));
          //     //all_tasks = result
          //   },
          //   function(error){
          //     alert('Error retrieving tasks');
          //   });
          // });
          app.get_tasks_list();
          //app.display_tasks_list();
        });

        $('#encrypt_button').click(function(){
          if($('#data_input_to_encrypt').val() === "")
            alert("You must enter some data!");
          else{
            alert("Starting encryption !");
            encryptedData = app.encrypt($('#data_input_to_encrypt').val());
            alert("Encrypted data is " + encryptedData);
            $('#encrypted_data').val(encryptedData);
            encryptedData = null;
          }
        });


        $('#decrypt_button').click(function(){
          if($('#encrypted_data').val() === "")
            alert("You must enter some data!");
          else{
            alert("Starting decryption !");
            var decryptedData = app.decrypt($('#encrypted_data').val());
            alert("Decrypted data is " + decryptedData);
            $('#decrypted_data').val(decryptedData);
            decryptedData = null ;
          }
        });


        var admobid = {
            banner: 'ca-app-pub-9597705126104767/5110567335'
            //interstitial: 'ca-app-pub-xxx/yyy'
        };



    },
    add_task: function(new_task){

      // alert("................In function add task...................");
      // alert("Passed in task details: ");
      // alert("Name: " + new_task.name);
      // alert("Status: " + new_task.status);
      // alert("Complete by: " + new_task.complete_by);

      db.transaction(function(transaction) {
      var executeQuery = "INSERT INTO tasks (name, status, complete_by) VALUES (?, ?, ?)";
      transaction.executeSql(executeQuery, [ new_task.name , new_task.status, new_task.complete_by ],
        function(tx, result) {
          alert('Added task');
        },
        function(error){
          alert('Error adding task');
        });
      });
    },

    create_table: function(){
      db.transaction(function(transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS tasks (id integer primary key, name text, status text, complete_by text)', [],
        function(tx, result) {
          alert(" Tasks table created successfully");
        },
        function(error) {
        alert("Error occurred while creating the table.");
        });
      });
    },

    get_tasks_list: function(){
      db.transaction(function(transaction) {
        var executeQuery = "SELECT * FROM tasks";
        transaction.executeSql(executeQuery, [],
        function(tx, result) {
          //alert('All tasks retrieved from database');
          //alert("Retrieved data is " + JSON.stringify(result.rows.item(0).name));
          all_tasks = result
          for (var i=0; i < result.rows.length; i++){
              row = result.rows.item(i);
              name = result.rows.item(i).name
              alert("row is " + JSON.stringify(row));
              alert("Name is: " + name);
          }
          for (i = 0; i < result.rows.length; i++){
            console.log("Stored data");
            console.log(JSON.stringify(result.rows.item(i)));
            //alert("Id: " + result.rows.item(i).id + " Name: " + JSON.stringify(result.rows.item(i).name) + " status: " + JSON.stringify(result.rows.item(i).status) + " complete_by: " + JSON.stringify(result.rows.item(i).complete_by));
          }
          //display_tasks_list();
        },
        function(error){
          alert('Error retrieving tasks');
        });
      });
    },

    display_tasks_list: function(){
      if(all_tasks !== null){
        var all_tasks_markup = "";
        for(i = 0; i < all_tasks.length; i++){
          all_tasks_markup += "<tr><td>" + all_tasks[i].name + "</td><td>" + all_tasks[i].status + "</td><td>" + all_tasks[i].status + "</td></tr>"
        }
        $('#tasks_table_body').append("" + all_tasks_markup);
        $('#all_tasks_table').show();
      }
      else{
        $('#no_tasks_message').show();
      }
    },

    encrypt: function(data){
      if(data != null)
        return(CryptoJS.AES.encrypt(data, passPhrase));
      else
        return(null);
    },

    decrypt: function(encryptedData){
      if(encryptedData != null){
        var temp = CryptoJS.AES.decrypt(encryptedData, passPhrase);
        return(temp.toString(CryptoJS.enc.Utf8));
      }
      else
        return(null);
    }

};


//db related functions

// create table
// function create_table(){
//   db.transaction(function(transaction) {
//     transaction.executeSql('CREATE TABLE IF NOT EXISTS tasks (id integer primary key, name text, status text, complete_by text)', [],
//     function(tx, result) {
//       alert(" Tasks table created successfully");
//     },
//     function(error) {
//     alert("Error occurred while creating the table.");
//     });
//   });
// }



// function to get data about tasks from database
// function get_tasks_list(){
//   db.transaction(function(transaction) {
//     var executeQuery = "SELECT * FROM tasks";
//     transaction.executeSql(executeQuery, [],
//     function(tx, result) {
//       alert('All tasks retrieved from database');
//       alert("Retrieved data is " + JSON.stringify(result));
//       //all_tasks = result
//     },
//     function(error){
//       alert('Error retrieving tasks');
//     });
//   });
// }

// Add new task to tasks table
// function add_task(new_task){
//
//   // console.log("................In function add task...................");
//   // tx.executeSql("INSERT INTO tasks (name, status, complete_by) VALUES (?, ?, ?)", [ new_task.name , new_task.status, new_task.complete_by ]);
//   db.transaction(function(transaction) {
//   var executeQuery = "INSERT INTO tasks (name, status, complete_by) VALUES (?, ?, ?)";
//   transaction.executeSql(executeQuery, [ new_task.name , new_task.status, new_task.complete_by ],
//     function(tx, result) {
//       alert('Added task');
//     },
//     function(error){
//       alert('Error adding task');
//     });
//   });
// }
