import csv

NUM_YEARS = 216
IGNORE = set([
	'Dominica',
	'Monaco',
	'Andorra',
	'Turks and Caicos Islands',
	'San Marino',
	'Bermuda',
	'Nauru',
	'Cayman Islands',
	'Palau',
	'Tuvalu',
	'St. Kitts and Nevis',
	'Marshall Islands',
	'Martinique',
	'Guam',
	'French Polynesia',
	'Western Sahara',
	'Virgin Islands (U.S.)',
	'Croatia',
	'Reunion',
	'Netherlands Antilles',
	'Mayotte',
	'New Caledonia',
	'Guadeloupe',
	'French Guiana'
])

def main():
	gdpMap = load('gdpRaw.csv')
	lifeMap = load('lifeRaw.csv')
	print len(gdpMap)
	print len(lifeMap)

	for key in gdpMap:
		if not key in lifeMap:
			print "'" + key + "',"

	for key in lifeMap:
		if not key in gdpMap:
			print "'" +key + "',"

	saveMap('gdp.csv', gdpMap)
	saveMap('life.csv', lifeMap)

def saveMap(fileName, countryMap):
	writer = csv.writer(open(fileName, 'wb'))
	for key in countryMap:
		row = [key]
		row += countryMap[key]
		writer.writerow(row)

def load(fileName):
	reader = csv.reader(open(fileName))
	header = reader.next()
	data = {}
	for row in reader:
		countryName = row[0]
		if countryName in IGNORE: continue
		if countryName:
			values = numberize(row[1:])
			if len(values) == NUM_YEARS:
				data[countryName] = values
	return data

def numberize(values):
	nums = []
	for v in values:
		try:
			intV = float(v)
			nums.append(intV)
		except:
			pass
	return nums

if __name__ == '__main__':
	main()