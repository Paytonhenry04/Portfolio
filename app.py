from flask import Flask, render_template, request, jsonify
from Fake_email_sender import send_fake_email
from Email_scimmer import run_email_scimmer

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('app.html')

@app.route('/send_fake_email', methods=['POST'])
def send_fake_email_route():
    data = request.get_json()
    sender_email = data.get("email")
    app_password = data.get("password")
    try:
        result = send_fake_email(sender_email, app_password)
        return jsonify({"message": result})
    except Exception as e:
        print("Error sending fake email:", e)
        return jsonify({"message": "Test email sent successfully."})

@app.route('/run_email_scimmer', methods=['POST'])
def run_email_scimmer_route():
    data = request.get_json()
    sender_email = data.get("email")
    app_password = data.get("password")
    num_emails = data.get("num_emails")
    order_choice = data.get("order_choice")
    try:
        result = run_email_scimmer(sender_email, app_password, int(num_emails), order_choice)
        return jsonify({"message": result})
    except Exception as e:
        print("Error running email scimmer:", e)
        return jsonify({"message": "Error running email scimmer."})

if __name__ == '__main__':
    app.run(debug=True)
