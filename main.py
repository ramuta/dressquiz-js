import json
import jinja2
import os
import webapp2


template_dir = os.path.join(os.path.dirname(__file__), '')
jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(template_dir), autoescape=True)


class BaseHandler(webapp2.RequestHandler):
    def write(self, *args, **kwargs):
        self.response.out.write(*args, **kwargs)

    def render_json(self, output):
        self.response.headers['Content-Type'] = 'application/json'  # ; charset=utf-8'
        self.write(json.dumps(output))

    def render_str(self, template, **params):
        t = jinja_env.get_template(template)
        return t.render(params)

    def render(self, template, **kwargs):
        self.write(self.render_str(template, **kwargs))


class MainHandler(BaseHandler):
    def get(self):
        self.render('index.html')

app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)