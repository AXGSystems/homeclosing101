export interface StateInsuranceDept {
  state: string;
  abbr: string;
  department: string;
  address: string;
  phone: string;
  website: string;
}

export const stateInsuranceData: StateInsuranceDept[] = [
  { state: "Alabama", abbr: "AL", department: "Department of Insurance", address: "201 Monroe St, Suite 502, Montgomery, AL 36104", phone: "334-269-3550", website: "https://aldoi.gov" },
  { state: "Alaska", abbr: "AK", department: "Division of Insurance", address: "550 West 7th Ave, Suite 1560, Anchorage, AK 99501", phone: "907-269-7900", website: "https://commerce.alaska.gov/web/ins/" },
  { state: "Arizona", abbr: "AZ", department: "Department of Insurance and Financial Institutions", address: "100 N. 15th Ave, Suite 261, Phoenix, AZ 85007", phone: "602-364-3100", website: "https://difi.az.gov/insurance" },
  { state: "Arkansas", abbr: "AR", department: "Department of Insurance", address: "1 Commerce Way, Little Rock, AR 72202", phone: "501-371-2600", website: "https://insurance.arkansas.gov" },
  { state: "California", abbr: "CA", department: "Department of Insurance", address: "300 South Spring St, 14th Floor, Los Angeles, CA 90013", phone: "800-927-4357", website: "https://insurance.ca.gov" },
  { state: "Colorado", abbr: "CO", department: "Division of Insurance", address: "1560 Broadway, Suite 850, Denver, CO 80202", phone: "303-894-7499", website: "https://doi.colorado.gov" },
  { state: "Connecticut", abbr: "CT", department: "Insurance Department", address: "153 Market St, 7th Floor, Hartford, CT 06103", phone: "860-297-3800", website: "https://portal.ct.gov/cid" },
  { state: "Delaware", abbr: "DE", department: "Department of Insurance", address: "1351 West North St, Suite 101, Dover, DE 19904", phone: "302-674-7300", website: "https://insurance.delaware.gov" },
  { state: "District of Columbia", abbr: "DC", department: "Dept. of Insurance, Securities and Banking", address: "1050 First St NE, Suite 801, Washington, DC 20002", phone: "202-727-8000", website: "https://disb.dc.gov" },
  { state: "Florida", abbr: "FL", department: "Office of Insurance Regulation", address: "200 East Gaines St, Tallahassee, FL 32399", phone: "850-413-3140", website: "https://floir.com" },
  { state: "Georgia", abbr: "GA", department: "Office of Insurance and Safety Fire Commissioner", address: "2 Martin Luther King Jr. Dr, West Tower, Suite 702, Atlanta, GA 30334", phone: "404-656-2070", website: "https://oci.georgia.gov" },
  { state: "Hawaii", abbr: "HI", department: "Insurance Division", address: "P.O. Box 3614, Honolulu, HI 96811", phone: "808-586-2790", website: "https://cca.hawaii.gov/ins/" },
  { state: "Idaho", abbr: "ID", department: "Department of Insurance", address: "700 West State St, 3rd Floor, Boise, ID 83720", phone: "208-334-4250", website: "https://doi.idaho.gov" },
  { state: "Illinois", abbr: "IL", department: "Department of Insurance", address: "320 West Washington St, Springfield, IL 62767", phone: "217-782-4515", website: "https://insurance.illinois.gov" },
  { state: "Indiana", abbr: "IN", department: "Department of Insurance", address: "311 West Washington St, Suite 300, Indianapolis, IN 46204", phone: "317-232-2385", website: "https://in.gov/idoi" },
  { state: "Iowa", abbr: "IA", department: "Insurance Division", address: "1963 Bell Ave, Suite 100, Des Moines, IA 50315", phone: "515-654-6600", website: "https://iid.iowa.gov" },
  { state: "Kansas", abbr: "KS", department: "Department of Insurance", address: "1300 SW Arrowhead Road, Topeka, KS 66604", phone: "785-296-3071", website: "https://insurance.kansas.gov" },
  { state: "Kentucky", abbr: "KY", department: "Department of Insurance", address: "500 Mero St 2 SE 11, Frankfort, KY 40601", phone: "502-564-3630", website: "https://insurance.ky.gov" },
  { state: "Louisiana", abbr: "LA", department: "Department of Insurance", address: "1702 North Third St, Baton Rouge, LA 70802", phone: "225-342-5423", website: "https://ldi.la.gov" },
  { state: "Maine", abbr: "ME", department: "Bureau of Insurance", address: "34 State House Station, Augusta, ME 04333", phone: "207-624-8475", website: "https://maine.gov/pfr/insurance/" },
  { state: "Maryland", abbr: "MD", department: "Insurance Administration", address: "200 St. Paul Place, Baltimore, MD 21202", phone: "410-468-2090", website: "https://insurance.maryland.gov" },
  { state: "Massachusetts", abbr: "MA", department: "Division of Insurance", address: "1000 Washington St, Suite 810, Boston, MA 02118", phone: "617-521-7794", website: "https://mass.gov/orgs/division-of-insurance" },
  { state: "Michigan", abbr: "MI", department: "Dept. of Insurance and Financial Services", address: "530 West Allegan St, Lansing, MI 48933", phone: "517-284-8800", website: "https://michigan.gov/difs/" },
  { state: "Minnesota", abbr: "MN", department: "Department of Commerce — Insurance", address: "85 7th Place East, Suite 500, St. Paul, MN 55101", phone: "651-539-1500", website: "https://mn.gov/commerce/industries/insurance/" },
  { state: "Mississippi", abbr: "MS", department: "Insurance Department", address: "501 North West St, Woolfolk Building, Jackson, MS 39201", phone: "601-359-3569", website: "https://mid.state.ms.us" },
  { state: "Missouri", abbr: "MO", department: "Department of Commerce and Insurance", address: "301 West High St, P.O. Box 690, Jefferson City, MO 65102", phone: "573-751-4126", website: "https://insurance.mo.gov" },
  { state: "Montana", abbr: "MT", department: "Commissioner of Securities and Insurance", address: "840 Helena Ave, Suite 270, Helena, MT 59601", phone: "406-444-2040", website: "https://csimt.gov" },
  { state: "Nebraska", abbr: "NE", department: "Department of Insurance", address: "1526 K St, Suite 200, Lincoln, NE 68508", phone: "402-471-2201", website: "https://doi.nebraska.gov" },
  { state: "Nevada", abbr: "NV", department: "Division of Insurance", address: "1818 East College Parkway, Carson City, NV 89706", phone: "775-687-0700", website: "https://doi.nv.gov" },
  { state: "New Hampshire", abbr: "NH", department: "Insurance Department", address: "21 South Fruit St, Suite 14, Concord, NH 03301", phone: "603-271-2261", website: "https://nh.gov/insurance/" },
  { state: "New Jersey", abbr: "NJ", department: "Department of Banking and Insurance", address: "20 West State St, Trenton, NJ 08625", phone: "609-292-7272", website: "https://state.nj.us/dobi/" },
  { state: "New Mexico", abbr: "NM", department: "Office of Superintendent of Insurance", address: "1120 Paseo de Peralta, Suite 428, Santa Fe, NM 87501", phone: "855-427-5674", website: "https://osi.state.nm.us" },
  { state: "New York", abbr: "NY", department: "Department of Financial Services", address: "1 State St, New York, NY 10004", phone: "212-480-6400", website: "https://dfs.ny.gov" },
  { state: "North Carolina", abbr: "NC", department: "Department of Insurance", address: "1201 Mail Service Center, Raleigh, NC 27699", phone: "855-408-1212", website: "https://ncdoi.gov" },
  { state: "North Dakota", abbr: "ND", department: "Insurance Department", address: "State Capitol, 600 East Boulevard, 5th Floor, Bismarck, ND 58505", phone: "701-328-2440", website: "https://insurance.nd.gov" },
  { state: "Ohio", abbr: "OH", department: "Department of Insurance", address: "50 West Town St, 3rd Floor, Suite 300, Columbus, OH 43215", phone: "614-644-2658", website: "https://insurance.ohio.gov" },
  { state: "Oklahoma", abbr: "OK", department: "Insurance Department", address: "400 NE 50th St, Oklahoma City, OK 73105", phone: "405-521-2828", website: "https://oid.ok.gov" },
  { state: "Oregon", abbr: "OR", department: "Division of Financial Regulation", address: "350 Winter St NE, Room 410, Salem, OR 97309", phone: "503-378-4140", website: "https://dfr.oregon.gov" },
  { state: "Pennsylvania", abbr: "PA", department: "Insurance Department", address: "1326 Strawberry Square, Harrisburg, PA 17120", phone: "717-787-7000", website: "https://insurance.pa.gov" },
  { state: "Rhode Island", abbr: "RI", department: "Department of Business Regulation — Insurance", address: "1511 Pontiac Ave, Cranston, RI 02920", phone: "401-462-9500", website: "https://dbr.ri.gov" },
  { state: "South Carolina", abbr: "SC", department: "Department of Insurance", address: "1201 Main St, Suite 1000, Columbia, SC 29201", phone: "803-737-6160", website: "https://doi.sc.gov" },
  { state: "South Dakota", abbr: "SD", department: "Division of Insurance", address: "445 East Capitol Ave, Pierre, SD 57501", phone: "605-773-3311", website: "https://dor.sd.gov" },
  { state: "Tennessee", abbr: "TN", department: "Department of Commerce and Insurance", address: "500 James Robertson Parkway, Suite 660, Nashville, TN 37243", phone: "615-741-2241", website: "https://tn.gov/commerce/insurance-division.html" },
  { state: "Texas", abbr: "TX", department: "Department of Insurance", address: "1601 Congress Ave, Austin, TX 78701", phone: "512-676-6000", website: "https://tdi.texas.gov" },
  { state: "Utah", abbr: "UT", department: "Insurance Department", address: "4315 S. 2700 W., Suite 2300, Taylorsville, UT 84114", phone: "801-957-9200", website: "https://insurance.utah.gov" },
  { state: "Vermont", abbr: "VT", department: "Dept. of Financial Regulation — Insurance", address: "89 Main St, Drawer 20, Montpelier, VT 05620", phone: "802-828-3302", website: "https://dfr.vermont.gov/industry/insurance" },
  { state: "Virginia", abbr: "VA", department: "Bureau of Insurance", address: "1300 E. Main St, Tyler Building, Richmond, VA 23219", phone: "804-371-9741", website: "https://scc.virginia.gov" },
  { state: "Washington", abbr: "WA", department: "Office of the Insurance Commissioner", address: "302 Sid Snyder Ave SW, Suite 200, Olympia, WA 98501", phone: "360-725-7100", website: "https://insurance.wa.gov" },
  { state: "West Virginia", abbr: "WV", department: "Offices of the Insurance Commissioner", address: "900 Pennsylvania Ave, Charleston, WV 25302", phone: "304-558-3386", website: "https://wvinsurance.gov" },
  { state: "Wisconsin", abbr: "WI", department: "Office of the Commissioner of Insurance", address: "101 E. Wilson St, Madison, WI 53703", phone: "608-266-3585", website: "https://oci.wi.gov" },
  { state: "Wyoming", abbr: "WY", department: "Department of Insurance", address: "106 East 6th Ave, Cheyenne, WY 82002", phone: "307-777-7401", website: "https://doi.wyo.gov" },
];

export const callingScript = `Hello, my name is [YOUR NAME] and I'm calling about a title insurance policy on my property.

I'm trying to locate my owner's title insurance policy for a property at [YOUR ADDRESS]. I purchased/refinanced this property on approximately [DATE].

Could you please help me with:
1. Finding the title insurance company that issued my policy
2. The contact information for that company
3. Any reference or policy number you may have on file

My property details are:
- Property Address: [YOUR ADDRESS]
- Approximate closing date: [DATE]
- County: [COUNTY NAME]

Thank you for your help.`;
