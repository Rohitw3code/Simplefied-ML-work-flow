from flask import Flask, render_template, request,redirect
import pandas as pd
import tempfile

app = Flask(__name__, template_folder='templates', static_folder='static')

meta = {}
f = "204-795.csv"


@app.route("/")
def home():
    return render_template("index.html")

@app.route('/upload', methods=['GET', 'POST'])
def load():
    if request.method == "POST":
        input_value = request.form.get("input_value", 5)
        df = pd.read_csv(f)
        shape = df.shape
        df = df.head(int(input_value))
        return render_template(
            'workflow.html',
            column_names=df.columns.values,
            row_data=df.values.tolist(),
            shape=shape,
            zip=zip
        )
    


@app.route('/add_value', methods=['POST'])
def add_value():
    print("Hello appended")
    value = request.form.get("new_value")
    print("value : ",value)
    # app.config['my_list'].append(value)
    return redirect('/upload') 
        


if __name__ == "__main__":
    app.run(debug=True, port=5001)
    # app.run(host='192.168.123.135', port=5001, debug=True, threaded=False)    
