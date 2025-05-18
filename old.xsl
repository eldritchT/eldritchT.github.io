<?xml version="1.0" encoding="UTF-8"?>
<html xsl:version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<body style="font-family:Arial;font-size:12pt;background-color:#EEEEEE">
<xsl:for-each select="content/body">
    <body style="background-color: black; color: white; margin: 0; height: 100%; text-align: center;">
        <div>
            <h1 style="font-weight:bold"><xsl:value-of select="heading" /></h1>
            <xsl:for-each select="box">
                <div style="border: 2px solid gray; padding: 8px;">
                    <p style="font-size: large;"><xsl:value-of select="box-heading" /></p>
                    <p><xsl:value-of select="box-content" /></p>
                </div>
            </xsl:for-each>
        </div>
    </body>
</xsl:for-each>
</body>
</html> 