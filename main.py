from flask import Flask, render_template, request, redirect, url_for
import pandas as pd

# Initializing Flask
app = Flask(__name__, template_folder='templates', static_folder='static')


@app.route("/")
def home():
    return render_template("index.html")

@app.route('/upload', methods=['GET', 'POST'])
def load():
    if request.method == "POST":
        f = request.files['file']
        print(f)
        return pd.read_csv(f).head()


    return "hello"



if __name__ == "__main__":
    app.run(debug=True,port=5001)