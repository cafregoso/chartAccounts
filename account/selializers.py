from dataclasses import fields
from rest_framework import serializers
from .models import Chart

class ChartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chart
        fields = (
            'id', 
            'AcctType', 
            'Account',
            'Description',
            'Department',
            'TypicalBal',
            'DebitOffset',
            'CreditOffset',
        )