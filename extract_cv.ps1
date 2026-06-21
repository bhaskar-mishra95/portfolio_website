$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open('D:\IDE Projects\Engineering Career Acceleration Roadmap\portfolio_website\Bhaskar_Mishra_CV_Master.docx')
$text = $doc.Content.Text
$doc.Close()
$word.Quit()
$text | Out-File -FilePath 'D:\IDE Projects\Engineering Career Acceleration Roadmap\portfolio_website\cv_text.txt' -Encoding UTF8
Write-Host "CV text extracted successfully"
