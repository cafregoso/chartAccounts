# Django
from urllib import request
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


class CreateChartView(generics.ListCreateAPIView):
    serializer_class = ChartSerializer
    queryset = Chart.objects.all()

    def post(self, request):
        is_many = isinstance(request.data, list)

        if not is_many:
            serializer = ChartSerializer(data=request.data)
            if serializer.is_valid():
                AcctType = serializer.data.get('AcctType')
                Account = serializer.data.get('Account')
                Description = serializer.data.get('Description')
                Department = serializer.data.get('Department')
                TypicalBal = serializer.data.get('TypicalBal')
                DebitOffset = serializer.data.get('DebitOffset')
                CreditOffset = serializer.data.get('CreditOffset')

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
        else:
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers= self.get_success_headers(serializer.data)

            return Response(serializer.data, status=status.HTTP_201_CREATED)


class ChartRetriveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ChartSerializer

    def get_queryset(self):
        return Chart.objects.all()