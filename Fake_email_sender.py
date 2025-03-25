import smtplib
from email.message import EmailMessage

def send_fake_email(sender_email, app_password):
    recipient_email = sender_email  # Sending to self
    msg = EmailMessage()
    msg.set_content("""\
Congratulations!

You have been selected to win a free lottery prize! 
To claim your prize, please visit: http://192.168.1.100/win-prize or http://malicious.xyz.
Thank you for your participation.
""")
    msg['Subject'] = "Congratulations! You Win a Free Prize!"
    msg['From'] = sender_email
    msg['To'] = recipient_email

    # Attach a fake executable
    fake_exe_content = b"This is a fake executable file for testing."
    msg.add_attachment(fake_exe_content,
                       maintype='application',
                       subtype='octet-stream',
                       filename="malware.exe")

    # Attach a fake image—but with a suspicious extension to trigger the analysis
    fake_image_content = b"This is fake image content for testing."
    msg.add_attachment(fake_image_content,
                       maintype='image',
                       subtype='jpeg',
                       filename="fake_image.exe")

    smtp_server = 'smtp.gmail.com'
    smtp_port = 587

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()  # Secure the connection
        server.login(sender_email, app_password)
        server.send_message(msg)

    print("Test email sent!")
    return "Test email sent successfully."

if __name__ == "__main__":
    sender_email = input("Enter your email address (sender): ").strip()
    app_password = input("Enter your app-specific password (visible for testing): ")
    send_fake_email(sender_email, app_password)
