from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permitir requisições de outros domínios (Node.js, Front-end)

# 🔥 Carregar modelo treinado
model = joblib.load('randomforest_best_model.pkl')
print(model.feature_names_in_)
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        input_data = np.array([[
            data['Age'],
            data['Monthly_Inhand_Salary'],
            data['Num_Bank_Accounts'],
            data['Num_Credit_Card'],
            data['Num_of_Loan'],
            data['Delay_from_due_date'],
            data['Num_of_Delayed_Payment'],
            data['Outstanding_Debt'],
            data['Total_EMI_per_month'],
            data['Amount_invested_monthly']
        ]])

        prediction = model.predict(input_data)

        return jsonify({'resultado': str(prediction[0])})

    except Exception as e:
        return jsonify({'erro': str(e)}), 400


@app.route('/', methods=['GET'])
def home():
    return "API de Machine Learning rodando 🚀"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

