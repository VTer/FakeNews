"""



"""

__author__ = 'Shawn'

from blacklist_detector  import BlackListDetector
from sitecredit_detector import SiteCreditDetector

detectors = []
detectors.append(BlackListDetector())
detectors.append(SiteCreditDetector())

for detector in detectors:
    url = "wolfStreet.com"
    print(detector.detect(url))