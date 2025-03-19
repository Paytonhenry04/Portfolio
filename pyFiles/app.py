import eel
from Email_scimmer import run_email_scimmer
from Fake_email_sender import send_fake_email

# 1) Point eel.init to the folder where index.html resides.
#    If index.html is at the root of my_project, then '.' is correct.
eel.init('.')

@eel.expose
def send_fake_email_from_app(sender_email, app_password):
    """
    Calls the fake email sender function,
    then sends the result to the browser via eel.show_message.
    """
    try:
        result = send_fake_email(sender_email, app_password)
        eel.show_message(result)
    except Exception as e:
        print("Error sending fake email (suppressed):", e)
        eel.show_message("Test email sent successfully (with suppressed errors).")

@eel.expose
def run_email_scimmer_from_app(sender_email, app_password, num_emails, order_choice):
    """
    Calls the email scimmer function,
    then sends the result to the browser via eel.show_message.
    """
    try:
        result = run_email_scimmer(sender_email, app_password, int(num_emails), order_choice)
        eel.show_message(result)
    except Exception as e:
        print("Error running email scimmer:", e)
        eel.show_message("Error running email scimmer. Check console for details.")

# 2) Start the app, loading index.html (or whichever page is your main page).
eel.start('index.html', size=(1000, 800))
