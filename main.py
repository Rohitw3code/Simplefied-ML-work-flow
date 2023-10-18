from flask import Flask, render_template, request, redirect,jsonify
import pandas as pd

app = Flask(__name__, template_folder='templates', static_folder='static')

df = None
features = set()
csv_file = "204-32.csv"


def load_data():
    global df, features
    df = pd.read_csv(csv_file)
    features = set(df.columns)
    


load_data()


@app.route("/")
def home():
    return render_template("index.html")


@app.route('/load_data')
def reload_data():
    load_data()
    return redirect('/upload')


@app.route('/select_feature/<feature>')
def select_feature(feature):
    if feature in features:
        features.remove(feature)
    else:
        features.add(feature)
    return redirect('/upload')


@app.route('/upload', methods=['GET', 'POST'])
def workflow():
    global df
    input_value = request.form.get("input_value", 2)
    display_dataframe = df.head(int(input_value))
    return render_template(
        'workflow.html',
        df=df,
        display_dataframe=display_dataframe,
        row_data=display_dataframe.values.tolist(),
        isna=dict(df.isna().sum()),
        features=features,
        list=list
    )

@app.route('/get_data', methods=['POST'])
def get_data():
    selected_option = request.form['select-feature']
    data = {}
    if selected_option == 'Season':
        data['add_button'] = True
        data['button_name'] = 'btn1'
    elif selected_option == 'GF':
        data['add_button'] = True
        data['button_name'] = 'btn2'
    else:
        data['add_button'] = False

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
