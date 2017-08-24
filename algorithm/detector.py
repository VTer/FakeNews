"""



"""

class Detector(object):

    """
    """
    def detect(self, url):
        domain = self.extractDomain(url)
        return self.detectByDomain(domain)

    """
    """
    def extractDomain(self, url):
        domain = url.lower()
        return domain

    """
    """
    def detectByDomain(self, domain):
        raise NotImplementedError
