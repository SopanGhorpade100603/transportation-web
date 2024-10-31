from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.security import check_password_hash

app = Flask(__name__)

# Database configuration
db_config = {
    'user': 'root',
    'password': 'root',
    'host': 'localhost',
    'database': 'backofficeagent'
}

CORS(app)  # Enable CORS for the entire app


@app.route('/signup/data', methods=['POST']) # get signup data
# to get ui form data
def register():
    data = request.get_json()  
    print("data is *** ",data)
    fName = data['fName']
    lName = data['lName']
    userName = data['userName']
    password = data['password']
    mobileNumber = data['mobileNumber']
    print(f"fName {fName} lName {lName} username {userName} password {password} mobileNumber {mobileNumber}")
   
    #  insert this data to database mysql
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "INSERT INTO userdata (firstName, lastName, username, password, mobileNumber) VALUES (%s, %s, %s, %s, %s)"
        values = (fName, lName, userName, password, mobileNumber)
        cursor.execute(query, values)
        connection.commit() 
        return jsonify({"message": "User registered successfully!","statusCode":200}), 200

    except mysql.connector.Error as err:
        print("Database Error:", err)
        return jsonify({"error": "Failed to register user"}), 400

    finally:
        cursor.close()
        connection.close()



@app.route('/api/data', methods=['POST'])        #login form to check username password exist
def receive_data():
    data = request.get_json()
    print('Received data:', data)

    if 'formData' not in data:
        return jsonify({'message': 'Invalid request data'}), 400

    username = data['formData'].get('username')
    password = data['formData'].get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    print("Username is:", username)
    print("Password is:", password)

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM userdata WHERE username = %s AND password = %s", (username, password))

        result = cursor.fetchall()
        print('Query result:', result) 
        if result != []:
            print("Login successful")
            return jsonify({'message': 'Login successful','statusCode':200}), 200
        else:
            print("User not found")
            return jsonify({'message': 'User not found','statusCode':404}), 404

    except mysql.connector.Error as err:
        print(f"Database error: {err}")
        return jsonify({'message': 'Database error'}), 500

    finally:
        if cursor:
            cursor.close()
        if connection.is_connected():
            connection.close()

if __name__ == '__main__':
    app.run(debug=True)