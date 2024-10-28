# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import mysql.connector

# app = Flask(__name__)

# # Database configuration
# db_config = {
#     'user': 'root',
#     'password': 'root',
#     'host': 'localhost',
#     'database': 'backofficeagent'
# }

# CORS(app)  # Enable CORS for the entire app

# @app.route('/api/data', methods=['POST'])
# def receive_data():
#     data = request.get_json()
#     print('data is',data)
#     username = data['formData']['username']
#     password = data['formData']['password']
#     print("username is *** ", username)
#     print("password is ***** ", password)

#     # Connect to the database
#     try:
#         connection = mysql.connector.connect(**db_config)
#         cursor = connection.cursor()

#         insert_query = "INSERT INTO userdata (username, password) VALUES (%s, %s)"
#         cursor.execute(insert_query, (username, password))
#         connection.commit()

#         return jsonify({'message': 'Data Saved Successfully!'}), 201
#     except mysql.connector.Error as err:  # Fixed exception handling to catch the correct Error type
#         return jsonify({'error': str(err)}), 500  # Corrected key 'error ' to 'error'
#     finally:
#         if connection.is_connected():
#             cursor.close()
#             connection.close()

# if __name__ == '__main__':
#     app.run(debug=True)
