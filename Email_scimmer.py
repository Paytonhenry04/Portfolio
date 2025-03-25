import imaplib
import email
from email.header import decode_header
import re
import os
import tempfile
from urllib.parse import urlparse

def check_spam(email_text):
    spam_indicators = ['win', 'prize', 'lottery', 'free']
    email_text_lower = email_text.lower()
    for word in spam_indicators:
        if word in email_text_lower:
            return True
    return False

def check_phishing(email_body):
    urls = re.findall(r'https?://[^\s]+', email_body)
    suspicious = []
    for url in urls:
        parsed = urlparse(url)
        if re.match(r'\d+\.\d+\.\d+\.\d+', parsed.netloc):
            suspicious.append(url)
        elif parsed.netloc.endswith('.xyz'):
            suspicious.append(url)
    return suspicious

def check_attachment(file_path):
    suspicious_extensions = ['.exe', '.bat', '.js']
    _, ext = os.path.splitext(file_path)
    if ext.lower() in suspicious_extensions:
        return True
    return False

def process_email_message(msg):
    email_text = ""
    attachments_flag = False

    if msg.is_multipart():
        for part in msg.walk():
            content_type = part.get_content_type()
            content_disposition = str(part.get("Content-Disposition"))
            if content_type == "text/plain" and "attachment" not in content_disposition:
                try:
                    part_text = part.get_payload(decode=True).decode()
                except Exception:
                    part_text = ""
                email_text += part_text
            if "attachment" in content_disposition:
                filename = part.get_filename()
                if filename:
                    file_data = part.get_payload(decode=True)
                    temp_dir = tempfile.gettempdir()
                    temp_path = os.path.join(temp_dir, filename)
                    try:
                        with open(temp_path, "wb") as f:
                            f.write(file_data)
                        if check_attachment(temp_path):
                            attachments_flag = True
                    except Exception as e:
                        print(f"Error processing attachment {filename}: {e}")
                    finally:
                        if os.path.exists(temp_path):
                            os.remove(temp_path)
    else:
        try:
            email_text = msg.get_payload(decode=True).decode()
        except Exception:
            email_text = ""

    is_spam = check_spam(email_text)
    phishing_urls = check_phishing(email_text)

    return {
        "is_spam": is_spam,
        "phishing_urls": phishing_urls,
        "suspicious_attachment": attachments_flag
    }

def connect_and_process_emails_gui(email_user, email_pass, num_emails, order_choice, imap_url="imap.gmail.com",
                                   mailbox="INBOX"):
    output = []
    try:
        mail = imaplib.IMAP4_SSL(imap_url)
        mail.login(email_user, email_pass)
    except Exception as e:
        output.append("Login failed: " + str(e))
        return "<br>".join(output)

    status, messages = mail.select(mailbox)
    if status != "OK":
        msg = f"Failed to open mailbox: {mailbox}"
        output.append(msg)
        return "<br>".join(output)

    status, message_numbers = mail.search(None, "ALL")
    if status != "OK":
        msg = "Failed to retrieve emails."
        output.append(msg)
        return "<br>".join(output)

    email_ids = message_numbers[0].split()
    total_emails = len(email_ids)
    output.append(f"You have {total_emails} emails in your {mailbox} mailbox.<br><br>")

    if num_emails > total_emails:
        num_emails = total_emails

    if order_choice not in ["newest", "oldest"]:
        order_choice = "newest"

    if order_choice == "newest":
        emails_to_process = email_ids[-num_emails:]
    else:
        emails_to_process = email_ids[:num_emails]

    output.append(f"Processing {num_emails} emails starting from the {order_choice} ones...<br><br>")

    for email_id in emails_to_process:
        status, data = mail.fetch(email_id, "(RFC822)")
        if status != "OK":
            output.append(f"Failed to fetch email ID {email_id.decode() if isinstance(email_id, bytes) else email_id}<br>")
            continue

        raw_email = data[0][1]
        msg_obj = email.message_from_bytes(raw_email)
        subject = msg_obj.get("Subject", "No Subject")
        decoded_subject, encoding = decode_header(subject)[0]
        if isinstance(decoded_subject, bytes):
            try:
                decoded_subject = decoded_subject.decode(encoding if encoding else "utf-8")
            except Exception:
                decoded_subject = decoded_subject.decode("utf-8", errors="ignore")

        results = process_email_message(msg_obj)
        flagged = results["is_spam"] or results["phishing_urls"] or results["suspicious_attachment"]
        flag_marker = "<span style='color: red; font-weight: bold;'>X</span> " if flagged else ""
        output.append(f"{flag_marker}Processing email: {decoded_subject}<br>")
        output.append("Analysis Report:<br>")
        output.append("  Spam Detected: " + str(results["is_spam"]) + "<br>")
        output.append("  Suspicious URLs: " + str(results["phishing_urls"]) + "<br>")
        output.append("  Suspicious Attachment Found: " + str(results["suspicious_attachment"]) + "<br>")
        output.append("<hr>")
    mail.logout()
    output.append("Email scanning completed.")
    return "".join(output)

def run_email_scimmer(email_user, email_pass, num_emails, order_choice):
    return connect_and_process_emails_gui(email_user, email_pass, num_emails, order_choice)

if __name__ == "__main__":
    print("Email Security Tool")
    print("===================")
    email_user = input("Enter your email address: ").strip()
    email_pass = input("Enter your email password or app-specific password: ").strip()
    result = connect_and_process_emails_gui(email_user, email_pass, 5, "newest")
    print(result)
