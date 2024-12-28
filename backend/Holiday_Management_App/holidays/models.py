from django.db import models

# Create your models here.
class Holiday(models.Model):
    country= models.CharField(max_length=10)
    year=models.IntegerField()
    name=models.CharField(max_length=255)

    date=models.DateField()

    class Meta:
        unique_together = ['country','year','name']