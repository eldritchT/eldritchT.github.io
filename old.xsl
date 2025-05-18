<?xml version="1.0" encoding="UTF-8"?>
<html xsl:version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<body style="font-family:Arial;font-size:12pt;background-color:#EEEEEE">
<xsl:for-each select="content/body">
    <h1 style="font-weight:bold"><xsl:value-of select="heading" /></h1>
</xsl:for-each>
</body>
</html> 