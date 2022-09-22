# Django
from django.shortcuts import render
from django.http import JsonResponse

# DRF
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

# Models
from account.models import Chart

# Selializers
from account.selializers import ChartSerializer

# Create your views here.


class ChartView(generics.ListAPIView):
    serializer_class = ChartSerializer
    queryset = Chart.objects.all()


class CreateChartView(APIView):
    serializer_class = ChartSerializer

    def post(self, request):
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            AcctType = serializer.data.get('acct_type')
            Account = serializer.data.get('account')
            Description = serializer.data.get('description')
            Department = serializer.data.get('department')
            TypicalBal = serializer.data.get('typical_bal')
            DebitOffset = serializer.data.get('debit_offset')
            CreditOffset = serializer.data.get('credit_offset')

            queryset = Chart.objects.filter(Account=Account)
            if queryset.exists():
                chart = queryset[0]
                chart.AcctType = AcctType
                chart.Description = Description
                chart.Department = Department
                chart.TypicalBal = TypicalBal
                chart.DebitOffset = DebitOffset
                chart.CreditOffset = CreditOffset

                chart.save(update_fields=[
                    'AcctType',
                    'Description',
                    'Department',
                    'TypicalBal',
                    'DebitOffset',
                    'CreditOffset'
                ])

                return Response(ChartSerializer(chart).data, status=status.HTTP_200_OK)
            else:
                chart = Chart(
                    AcctType = AcctType,
                    Account=Account,
                    Description = Description,
                    Department = Department,
                    TypicalBal = TypicalBal,
                    DebitOffset = DebitOffset,
                    CreditOffset = CreditOffset,
                )
                chart.save()

                return Response(ChartSerializer(chart).data, status=status.HTTP_201_CREATED)
            
        return Response({'Bad Request': 'Invalid data.'}, status= status.HTTP_400_BAD_REQUEST)


class ChartRetriveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ChartSerializer

    def get_queryset(self):
        return Chart.objects.all()