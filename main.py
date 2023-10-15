from flask import Flask, render_template, request
import pandas as pd
import tempfile

app = Flask(__name__, template_folder='templates', static_folder='static')

app.config['UPLOAD_FOLDER'] = tempfile.mkdtemp() 


@app.route("/")
def home():
    return render_template("index.html")

@app.route('/upload', methods=['GET', 'POST'])
def load():
    if request.method == "POST":
        input_value = request.form.get("input_value")
        if input_value == None:
            input_value = 5
        # f = request.files['file']
        f = "204-795.csv"
        df = pd.read_csv(f)
        shape = df.shape
        df = df.head(int(input_value)) 
        return render_template(
            'ana.html',
            column_names=df.columns.values,
            row_data=df.values.tolist(),
            shape=shape,
            zip=zip
        )
    


if __name__ == "__main__":
    app.run(debug=True, port=5001)
