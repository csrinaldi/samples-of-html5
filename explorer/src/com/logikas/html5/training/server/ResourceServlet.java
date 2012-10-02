package com.logikas.html5.training.server;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ResourceServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		URL resource = getServletContext().getResource(
				"/WEB-INF/resources/05NoMoreHeroes.mp3");

		File file = new File(resource.getPath());

		byte[] result = new byte[(int) file.length()];
		try {
			InputStream input = null;
			try {
				int totalBytesRead = 0;
				input = new BufferedInputStream(new FileInputStream(file));
				while (totalBytesRead < result.length) {
					int bytesRemaining = result.length - totalBytesRead;
					// input.read() returns -1, 0, or more :
					int bytesRead = input.read(result, totalBytesRead,
							bytesRemaining);
					if (bytesRead > 0) {
						totalBytesRead = totalBytesRead + bytesRead;
					}
				}
				resp.addHeader("Access-Control-Allow-Origin", "*");
				resp.setHeader("Content-Type", "img/mp3");
				resp.setIntHeader("Content-Length", (int) file.length());
				// response.setHeader("Accept-Ranges", "bytes");

				// lo escribimos
				OutputStream out = resp.getOutputStream();
				out.write(result);
				out.close();

			} finally {
				log("Closing input stream.");
				input.close();
			}

		} catch (IOException ex) {
			System.out.print("Error!!!!");
		}
	}
}