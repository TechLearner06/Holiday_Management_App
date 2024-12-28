import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings

@api_view(['GET'])
def get_holidays(request):
    country = request.query_params.get('country')
    year = request.query_params.get('year')

    if not country or not year:
        return Response({"error": "Country and year are required"}, status=400)

    url = "https://calendarific.com/api/v2/holidays"
    params = {
        "api_key": settings.CALENDARIFIC_API_KEY,
        "country": country,
        "year": year,
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        holidays = response.json().get('response', {}).get('holidays', [])
        return Response(holidays)
    else:
        return Response({"error": "Failed to fetch holidays"}, status=response.status_code)
