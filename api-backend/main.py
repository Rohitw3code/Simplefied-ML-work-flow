from flask import Flask,request,jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# CORS(app)

f = "dataset.csv"
df = pd.read_csv(f)


@app.route('/api/',methods=['GET'])
def dataframe():
    return jsonify({"message":["working","person"]})

@app.route('/api/df/<count>',methods=['GET'])
def hello(count:int = 5):
    print("COUNT : ",count)
    data = df.dropna()
    data = data.head(int(count)).to_dict(orient='list')
    return data

if __name__ == "__main__":
    app.run(debug=True,port=5001)