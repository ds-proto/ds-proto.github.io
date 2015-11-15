import pandas as pd
import requests
import os.path

url = 'https://explorer.usaid.gov/prepared/us_foreign_aid_complete.csv'
src = 'data/us_foreign_aid_complete.csv'
dest = 'data/2003_2012_foreign_aid.csv'

def download_file(url, filename):
    r = requests.get(url, stream=True)
    with open(filename, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024): 
            if chunk:
                f.write(chunk)

if not(os.path.isfile(src)):
   print "Downloading complete US foreign aid dataset from: " + url
   print "Downloading to: " + src
   print "This could take awhile..."
   download_file(url,src)

print "Writing cleaner dataset to " + dest
aid = pd.read_csv(src).drop([
'country_id',
'region_id',
'income_group_id',
'income_group_acronym',
'implementing_agency_id',
'implementing_agency_acronym',
'implementing_subagency_id',
'subagency_name',
'subagency_acronym',
'channel_category_id',
'channel_subcategory_id',
'channel_subcategory_name',
'channel_name',
'channel_id',
'dac_category_id',
'dac_sector_code',
'dac_purpose_code',
'funding_account_name',
'funding_account_id',
'funding_agency_id',
'funding_agency_acronym',
'assistance_category_id',
'aid_type_group_id',
'aid_type_group_name',
'activity_id',
'activity_project_number',
'transaction_type_id'
], axis=1)

aid = aid[aid.current_amount > 0]
aid = aid[aid.constant_amount > 0]
aid = aid[aid.numeric_year >= 2003]
aid = aid[aid.numeric_year <= 2012]

aid.to_csv(dest, index=False)
