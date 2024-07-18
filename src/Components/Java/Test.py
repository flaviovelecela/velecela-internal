import os
import logging
from flask import Flask, request, jsonify, after_this_request
from flask_cors import CORS
import sympy as sp
from waitress import serve

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

logger.info("Starting application...")

app = Flask(__name__)

logger.info("Flask app created")

# Use environment variable for CORS configuration
allowed_origins = os.environ.get('ALLOWED_ORIGINS', 'https://velecela.org,https://www.velecela.org').split(',')
CORS(app, resources={r"/*": {"origins": allowed_origins}}, supports_credentials=True)

logger.info(f"CORS configured with allowed origins: {allowed_origins}")

@app.after_request
def after_request(response):
    origin = request.headers.get('Origin')
    logger.info(f"Origin: {origin}")
    if origin in allowed_origins:
        response.headers.add('Access-Control-Allow-Origin', origin)
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
        logger.info(f"Added CORS headers for origin: {origin}")
    else:
        logger.info(f"Origin not allowed: {origin}")
    logger.info(f"Response headers: {response.headers}")
    return response

def preprocess_expression(expression):
    """Preprocess LaTeX expression to Python-compatible expression."""
    return expression.replace('^', '**')

@app.route('/calculate', methods=['POST'])
def calculate():
    logger.info("Received calculation request")
    data = request.get_json()
    expression = data.get('expression', '')
    variable = data.get('variable', 'x')
    x = sp.symbols(variable)

    try:
        processed_expression = preprocess_expression(expression)
        parsed_expression = sp.sympify(processed_expression)
        integral = sp.integrate(parsed_expression, x)
        result = sp.latex(integral)
        logger.info(f"Calculation successful: {result}")
    except Exception as e:
        result = str(e)
        logger.error(f"Calculation error: {result}")

    return jsonify(result=result)

# Test CORS route
@app.route('/test-cors', methods=['OPTIONS', 'GET'])
def test_cors():
    logger.info("test-cors endpoint hit")
    return 'CORS headers are working'

logger.info("Route defined")

if __name__ == "__main__":
    logger.info("Entering main block")
    port = int(os.environ.get('PORT', 5000))
    logger.info(f"Starting server on port {port}")
    try:
        serve(app, host='0.0.0.0', port=port)
    except Exception as e:
        logger.error(f"Error starting server: {str(e)}")
    logger.info("Server started")
