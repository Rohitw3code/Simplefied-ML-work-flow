from flask import Flask, render_template, request,redirect
import pandas as pd
import tempfile

app = Flask(__name__, template_folder='templates', static_folder='static')

features = ["empty"]
df = {}

start = True


f = "204-32.csv"

@app.route("/")
def home():
    return render_template("index.html")

def setDeafult(path):
    global features,start,df
    if start:
         df = pd.read_csv(path) 
         features = list(df.columns)
         start = False

def selectFeature(val:str=None):
    if val:
        if val in features:
            features.remove(val)
        else:
            features.append(val)

@app.route('/upload/<val>', methods=['GET', 'POST'])
@app.route('/upload', methods=['GET', 'POST'])
def load(val:str=None):
    global start,features    
    if request.method == "POST":
        input_value = request.form.get("input_value", 2)
        selectFeature(val)
        setDeafult(f)
        display_dataframe = df.head(int(input_value))
        return render_template(
            'workflow.html',
            column_names=display_dataframe.columns.values,
            row_data=display_dataframe.values.tolist(),
            shape=display_dataframe.shape,
            db = df,
            isna = dict(df.isna().sum()),
            features = features,
            zip=zip,
            list=list
            )
    




if __name__ == "__main__":
    app.run(debug=True, port=5001)
