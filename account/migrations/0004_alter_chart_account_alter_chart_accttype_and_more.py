# Generated by Django 4.1.1 on 2022-09-24 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_alter_chart_account_alter_chart_accttype_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chart',
            name='Account',
            field=models.CharField(blank=True, default='', max_length=10, null=True, verbose_name='Account Number'),
        ),
        migrations.AlterField(
            model_name='chart',
            name='AcctType',
            field=models.CharField(blank=True, default='', max_length=30, null=True, verbose_name='Account Type'),
        ),
        migrations.AlterField(
            model_name='chart',
            name='CreditOffset',
            field=models.CharField(blank=True, default='', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='chart',
            name='DebitOffset',
            field=models.CharField(blank=True, default='', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='chart',
            name='Department',
            field=models.CharField(blank=True, default='', max_length=50, null=True, verbose_name='Department'),
        ),
        migrations.AlterField(
            model_name='chart',
            name='Description',
            field=models.CharField(blank=True, default='', max_length=150, null=True, verbose_name='Description'),
        ),
        migrations.AlterField(
            model_name='chart',
            name='TypicalBal',
            field=models.CharField(blank=True, default='', max_length=5, null=True, verbose_name='Typical Balance'),
        ),
    ]
