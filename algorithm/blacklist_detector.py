"""



"""

__author__ = 'Shawn'

import csv

from detector import Detector


class BlackListDetector(Detector):
    _fakeNewsDomains = []
    FAKE_NEWS_FILE   = "FakeNewsSites.csv"

    def __init__(self):
        self.loadFakeNewsDomains()

    def detectByDomain(self, domain):
        print("BlackListDetector")
        for fakeNewsDomain in self._fakeNewsDomains:
            if fakeNewsDomain in domain:
                return True
        return False

    def loadFakeNewsDomains(self):
        with open(BlackListDetector.FAKE_NEWS_FILE, 'r') as f:
            reader = csv.reader(f)
            data = list(reader)
            for row in data:
                if len(row) > 0:
                    self._fakeNewsDomains.append(row[0].lower())
