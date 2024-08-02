from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        # Extract data from request
        data = request.json.get('data', [])
        full_name = request.json.get('full_name', "")
        dob = request.json.get('dob', "")
        email = request.json.get('email', "")
        roll_number = request.json.get('roll_number', "")

        # Validate required fields
        if not all([data, full_name, dob, email, roll_number]):
            return jsonify({"is_success": False, "message": "Missing required fields"}), 400

        # Separate numbers and alphabets
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]

        # Determine the highest alphabet
        highest_alphabet = max(alphabets, key=lambda c: c.upper(), default=None)
        highest_alphabet = [highest_alphabet] if highest_alphabet else []

        # Generate user_id
        user_id = f"{full_name.lower().replace(' ', '_')}_{dob.replace('-', '')}"

        # Return response
        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"is_success": False, "message": str(e)}), 500

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(debug=True)
