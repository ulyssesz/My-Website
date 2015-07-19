from google.appengine.ext import webapp
from google.appengine.api import mail
from google.appengine.api import users

from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
import logging
import wsgiref.handlers

class InviteFriendHandler(webapp.RequestHandler):
	def send_error(self, message):
		self.response.write(message)
		self.response.set_status(404)

	def post(self):
		from_addr = self.request.get("email")
		name = self.request.get("name")
		body = self.request.get("message")

		if not from_addr.strip():
			self.send_error("Invalid email")
			return
		elif not name.strip():
			self.send_error("Invalid name")
			return
		elif not body.strip():
			self.send_error("Invalid message")
			return


		message = mail.EmailMessage()
		message.sender = "me@ulysses-zheng.appspotmail.com"
		message.to = "ulysses147@gmail.com"
		message.body = "Sent from: %s at %s.\nBody:\n%s" % (name, from_addr, body)
		message.subject = "Message from: %s" % from_addr
		logging.info("sending to %s" % message.sender)
		message.send()
	def get(self):
		logging.info("sdfasfdasfas Hello get")
def main():
	application = webapp.WSGIApplication([('/.*', InviteFriendHandler),
										('/contact_me.py', InviteFriendHandler)], debug=True)
	run_wsgi_app(application)


if __name__ == '__main__':
	main()