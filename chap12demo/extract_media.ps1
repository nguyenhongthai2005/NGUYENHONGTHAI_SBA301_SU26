Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead("D:\SBA301\chap12demo\Lab 03_RESTful Web Services with Spring Boot.docx")
$dest = "D:\SBA301\chap12demo\extracted_media"
if (!(Test-Path $dest)) { New-Item -ItemType Directory -Force -Path $dest | Out-Null }
foreach ($entry in $zip.Entries) {
    if ($entry.FullName.StartsWith('word/media/')) {
        $file = Join-Path $dest $entry.Name
        [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $file, $true)
    }
}
$zip.Dispose()
