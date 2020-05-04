from flask import Flask, render_template, url_for
app = Flask(__name__)

posts = [
{
	'author':'Milstein Program',
	'title':'class1',
	'page':'class1.html',
	'content':'zero post',
	'date_posted':'May 1, 2020'
},
{
	'author':'Milstein Program ODE',
	'title':'class2',
	'page':'class2.html',
	'content':'first post',
	'date_posted':'May 4, 2020'
},

]
@app.route('/')
@app.route('/index')
@app.route('/index.html')
def home():
    return render_template('index.html', posts=posts)

@app.route('/about')
def about():
	return render_template('about.html')

@app.route('/login_student')
@app.route('/login_student.html')
def student():
	return render_template('login_student.html',title="Students")

@app.route('/login_teacher')
@app.route('/login_teacher.html')
def teacher():
	return render_template('login_teacher.html',title="Teachers")

@app.route('/classes')
@app.route('/classes.html')
def classes():
    return render_template('classes.html', posts=posts, student_name="Milstein Program")

@app.route('/class1')
@app.route('/class1.html')
def class1():
	return render_template('class1.html',student_name="Milstein Program")


if __name__=='__main__':
	app.run(debug=True)

