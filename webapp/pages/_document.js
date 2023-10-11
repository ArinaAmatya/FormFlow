import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document { 
    render() { 
        return ( 
			<Html>
				<Head>
					<meta name="description"
						content="A webapp for searching files" />
					<meta name="author"
						content="Bluefeet" />
					<link rel="icon"
						type="image/x-icon"
						href="/icons/favicon.ico"
						sizes="any" />
					<link rel="stylesheet"
						type="text/css"
						href="//fonts.googleapis.com/css?family=Josefin+Sans" />
					<link rel='stylesheet'
						type="text/css"
						href="https://fonts.googleapis.com/css?family=Prompt" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		) 
	} 
}