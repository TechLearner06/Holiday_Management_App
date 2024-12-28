import requests
from django.conf import settings

def holiday_data(country,year):
    url="https://calendarific.com/api/v2/holidays"
    params= { "api_key":settings.CALENDARIFIC_API_KEY,
              "country":country,
              "year":year }
    
    response= requests.get(url,params=params)

    if response.status_code == 200:
        return response.json().get('response',{}).get('holidays',[])
    return []