
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class Login1 extends Simulation {

	val httpProtocol = http
		.baseUrl("https://solidcommunity.net")
		.inferHtmlResources()
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.9")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36")

	val headers_0 = Map(
		"Accept-Encoding" -> "gzip, deflate",
		"Cache-Control" -> "no-cache",
		"Pragma" -> "no-cache",
		"Proxy-Connection" -> "keep-alive")

	val headers_1 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"Cache-Control" -> "max-age=0",
		"Sec-Fetch-Dest" -> "document",
		"Sec-Fetch-Mode" -> "navigate",
		"Sec-Fetch-Site" -> "cross-site",
		"Sec-Fetch-User" -> "?1",
		"Upgrade-Insecure-Requests" -> "1",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_2 = Map(
		"Accept" -> "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
		"Cache-Control" -> "no-cache",
		"Pragma" -> "no-cache",
		"Sec-Fetch-Dest" -> "image",
		"Sec-Fetch-Mode" -> "no-cors",
		"Sec-Fetch-Site" -> "same-origin",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_3 = Map(
		"Accept" -> "*/*",
		"Sec-Fetch-Dest" -> "empty",
		"Sec-Fetch-Mode" -> "cors",
		"Sec-Fetch-Site" -> "same-origin",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_5 = Map(
		"Accept" -> "*/*",
		"Origin" -> "https://solidcommunity.net",
		"Sec-Fetch-Dest" -> "empty",
		"Sec-Fetch-Mode" -> "cors",
		"Sec-Fetch-Site" -> "same-origin",
		"content-type" -> "application/json",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_6 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"Sec-Fetch-Dest" -> "document",
		"Sec-Fetch-Mode" -> "navigate",
		"Sec-Fetch-Site" -> "same-origin",
		"Sec-Fetch-User" -> "?1",
		"Upgrade-Insecure-Requests" -> "1",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_7 = Map(
		"Accept" -> "text/css,*/*;q=0.1",
		"Sec-Fetch-Dest" -> "style",
		"Sec-Fetch-Mode" -> "no-cors",
		"Sec-Fetch-Site" -> "same-origin",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

	val headers_9 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"Cache-Control" -> "max-age=0",
		"Origin" -> "https://solidcommunity.net",
		"Sec-Fetch-Dest" -> "document",
		"Sec-Fetch-Mode" -> "navigate",
		"Sec-Fetch-Site" -> "same-origin",
		"Sec-Fetch-User" -> "?1",
		"Upgrade-Insecure-Requests" -> "1",
		"sec-ch-ua" -> """" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"""",
		"sec-ch-ua-mobile" -> "?0")

    val uri2 = "http://www.gstatic.com/generate_204"

	val scn = scenario("Login1")
		.exec(http("Login1_0")
			.get(uri2)
			.headers(headers_0))
		.pause(51)
		.exec(http("Login1_1")
			.get("/common/popup.html")
			.headers(headers_1)
			.resources(http("Login1_2")
			.get("/favicon.ico")
			.headers(headers_2)
			.check(bodyBytes.is(RawFileBody("/login1/0002_response.dat"))))
			.check(bodyBytes.is(RawFileBody("/login1/0001_response.html"))))
		.pause(1)
		.exec(http("Login1_3")
			.get("/.well-known/openid-configuration")
			.headers(headers_3)
			.resources(http("Login1_4")
			.get("/jwks")
			.headers(headers_3)
			.check(bodyBytes.is(RawFileBody("/login1/0004_response.json"))),
            http("Login1_5")
			.post("/register")
			.headers(headers_5)
			.body(RawFileBody("/login1/0005_request.json"))
			.check(bodyBytes.is(RawFileBody("/login1/0005_response.json"))),
            http("Login1_6")
			.get("/authorize?scope=openid&client_id=3b341b77386671e8755e72e6c7c8282a&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldC9jb21tb24vcG9wdXAuaHRtbCIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiJCT2RiY2R1eHhHOHE0UDhZQTdRRF9Db3E1Mlgyb2xqSUZfUjZ0ZXQwbVM4Iiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJtMnduVkg3QlFib1NHU2tYMG1YUnNQYUM0N2Zidk93SndGZnR4UVpYNTRLNEprSTdyQTBGakUyaEpIWGFrSFEyNC1yUXp2dEhUWFplZzloSG5RMl9FbDM0U3c3elFiUFpMSVRJVDdZWmZ0S01UbkJGeW1YanIzQVM4Ymtyb3VCcDZxbm5tcU83aUxiWGFnVU40VDRUM1FEUDBRTGk4TTBQTWo2cTY5aUh0T1dZaVVzYnpGN1Z5YWFDaldGckM0MHQzc19qZkdIbmZEZUdJX0NlQWRDMzdwb0k0T1hYYWttWk16ZEtHQ0hOVE0tTXFuelAwSVB1Y0IyYzJCZXYzS0FHOGNlbUVYT1ZkUXVaTlhQMWJnV0w2bHh1elpQMmdUbXk4Tnl3VkpQZm4wWDhrWEZ4ZW0zSENoRmJiRDVOSS01WGcySlA0cDRBQTJ2a21jVTE1VUR2dncifX0.&state=UD60TwOhGuTI_LImMT7L_s-lKfdMuSRuhZTKBsn7G3k")
			.headers(headers_6)
			.check(bodyBytes.is(RawFileBody("/login1/0006_response.html"))),
            http("Login1_7")
			.get("/common/css/bootstrap.min.css")
			.headers(headers_7)
			.check(bodyBytes.is(RawFileBody("/login1/0007_response.css"))),
            http("Login1_8")
			.get("/common/css/solid.css")
			.headers(headers_7)
			.check(bodyBytes.is(RawFileBody("/login1/0008_response.css"))))
			.check(bodyBytes.is(RawFileBody("/login1/0003_response.json"))))
		.pause(15)
		.exec(http("Login1_9")
			.post("/login/password")
			.headers(headers_9)
			.formParam("username", "Radarin6b")
			.formParam("password", "Radarin_es6b")
			.formParam("response_type", "id_token token")
			.formParam("display", "")
			.formParam("scope", "openid")
			.formParam("client_id", "3b341b77386671e8755e72e6c7c8282a")
			.formParam("redirect_uri", "https://solidcommunity.net/common/popup.html")
			.formParam("state", "UD60TwOhGuTI_LImMT7L_s-lKfdMuSRuhZTKBsn7G3k")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldC9jb21tb24vcG9wdXAuaHRtbCIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiJCT2RiY2R1eHhHOHE0UDhZQTdRRF9Db3E1Mlgyb2xqSUZfUjZ0ZXQwbVM4Iiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJtMnduVkg3QlFib1NHU2tYMG1YUnNQYUM0N2Zidk93SndGZnR4UVpYNTRLNEprSTdyQTBGakUyaEpIWGFrSFEyNC1yUXp2dEhUWFplZzloSG5RMl9FbDM0U3c3elFiUFpMSVRJVDdZWmZ0S01UbkJGeW1YanIzQVM4Ymtyb3VCcDZxbm5tcU83aUxiWGFnVU40VDRUM1FEUDBRTGk4TTBQTWo2cTY5aUh0T1dZaVVzYnpGN1Z5YWFDaldGckM0MHQzc19qZkdIbmZEZUdJX0NlQWRDMzdwb0k0T1hYYWttWk16ZEtHQ0hOVE0tTXFuelAwSVB1Y0IyYzJCZXYzS0FHOGNlbUVYT1ZkUXVaTlhQMWJnV0w2bHh1elpQMmdUbXk4Tnl3VkpQZm4wWDhrWEZ4ZW0zSENoRmJiRDVOSS01WGcySlA0cDRBQTJ2a21jVTE1VUR2dncifX0.")
			.check(bodyBytes.is(RawFileBody("/login1/0009_response.html"))))

	setUp(scn.inject(atOnceUsers(15))).protocols(httpProtocol)
}