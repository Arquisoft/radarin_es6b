
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class LocalLogin extends Simulation {

	val httpProtocol = http
		.baseUrl("https://solidcommunity.net")
		.inferHtmlResources()
		.acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.upgradeInsecureRequestsHeader("1")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0")

	val headers_0 = Map(
		"If-Modified-Since" -> "Sat, 26 Oct 1985 08:15:00 GMT",
		"If-None-Match" -> """W/"4f746-7438674ba0"""")

	val headers_2 = Map("Origin" -> "https://solidcommunity.net")



	val scn = scenario("LocalLogin")
		.exec(http("LocalLogin_0")
			.get("/common/popup.html")
			.headers(headers_0))
		.pause(1)
		.exec(http("LocalLogin_1")
			.get("/authorize?scope=openid&client_id=db9ab8868e8442a25622732c0d5ea684&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldC9jb21tb24vcG9wdXAuaHRtbCIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiItc2ZSMUdlNExReTRMR1ZwNlYzOEhuZGg2bDVwMmw0Y1l0Si14bGNEenN3Iiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJ6Y0R2TDZUYUNucU1lS1c4VllEcE5uZ0tDS3hrLWx5SUtxVnZ3c2NHNlFQc1RhbU9rNlF3N2ZWZmljS05YOUNxWXJTbTBmbVIyUk9SenlLc2dUOE44LUF2V0U5aTVWNURRUUU1TlY1anBNcDF1OVJjeW1UTG5JSk5zeXFvUnRBWjA1NDNOVkpHR2w0X3VUZ0hpOGRBbTlNWVBMQTRuUEdLQnZBb1VfcUJNMmo2M3NEVWJhTlFkV2x5cUVlUXNia2t2T3VKdWVuQW1ZRXYwQ1NfZ3BsSEx2SjE4Q044QWh4WjVRQ3h6WmRCT2VqY2ZZQzdyVGIyLTNxdEFOa0twS3JBc2k1Z2hFbWpkb1ZhS3N6Z25PdFlNXzFHZ2YwS1Q1SUhaZFdpQkNCcHcwbWstSmN6cFVrLUJPMUlDaXd6WnI5STBfcFNkMnR0azlxLUZrQ1U2SXcxbVEifX0.&state=1YPg5rYrK6cUK3n6hmGghPQRnoaeCmnQMcGk0Wef-Co")
			.check(bodyBytes.is(RawFileBody("/locallogin/0001_response.html"))))
		.pause(24)
		.exec(http("LocalLogin_2")
			.post("/login/password")
			.headers(headers_2)
			.formParam("username", "Radarin6b")
			.formParam("password", "Radarin_es6b")
			.formParam("response_type", "id_token token")
			.formParam("display", "")
			.formParam("scope", "openid")
			.formParam("client_id", "db9ab8868e8442a25622732c0d5ea684")
			.formParam("redirect_uri", "https://solidcommunity.net/common/popup.html")
			.formParam("state", "1YPg5rYrK6cUK3n6hmGghPQRnoaeCmnQMcGk0Wef-Co")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldC9jb21tb24vcG9wdXAuaHRtbCIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiItc2ZSMUdlNExReTRMR1ZwNlYzOEhuZGg2bDVwMmw0Y1l0Si14bGNEenN3Iiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiJ6Y0R2TDZUYUNucU1lS1c4VllEcE5uZ0tDS3hrLWx5SUtxVnZ3c2NHNlFQc1RhbU9rNlF3N2ZWZmljS05YOUNxWXJTbTBmbVIyUk9SenlLc2dUOE44LUF2V0U5aTVWNURRUUU1TlY1anBNcDF1OVJjeW1UTG5JSk5zeXFvUnRBWjA1NDNOVkpHR2w0X3VUZ0hpOGRBbTlNWVBMQTRuUEdLQnZBb1VfcUJNMmo2M3NEVWJhTlFkV2x5cUVlUXNia2t2T3VKdWVuQW1ZRXYwQ1NfZ3BsSEx2SjE4Q044QWh4WjVRQ3h6WmRCT2VqY2ZZQzdyVGIyLTNxdEFOa0twS3JBc2k1Z2hFbWpkb1ZhS3N6Z25PdFlNXzFHZ2YwS1Q1SUhaZFdpQkNCcHcwbWstSmN6cFVrLUJPMUlDaXd6WnI5STBfcFNkMnR0azlxLUZrQ1U2SXcxbVEifX0.")
			.check(bodyBytes.is(RawFileBody("/locallogin/0002_response.html"))))

	setUp(scn.inject(atOnceUsers(3))).protocols(httpProtocol)
}