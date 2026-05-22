# Keiki's Cakes — Stealth Start & Auto-Open
$ProjectDir = $PSScriptRoot
$VitePort = 5174
$CloudflaredPath = "$ProjectDir\cloudflared.exe"

# 1. Start Vite Silently
Start-Process -FilePath "npm" -ArgumentList "run", "dev", "--", "--port", "$VitePort" -WindowStyle Hidden -WorkingDirectory $ProjectDir

# 2. Start Cloudflare Tunnel and Extract Link
Write-Host "Creating your live link... please wait 10 seconds." -ForegroundColor Cyan

$processInfo = New-Object System.Diagnostics.ProcessStartInfo
$processInfo.FileName = $CloudflaredPath
$processInfo.Arguments = "tunnel --url http://localhost:$VitePort"
$processInfo.RedirectStandardError = $true
$processInfo.UseShellExecute = $false
$processInfo.CreateNoWindow = $false # Keep it for a moment to see output

$process = [System.Diagnostics.Process]::Start($processInfo)

# Wait for the link to appear in the error stream (where cloudflared logs)
$link = ""
$timeout = Get-Date
$timeout = $timeout.AddSeconds(30)

while ((Get-Date) -lt $timeout) {
    if ($process.HasExited) { break }
    $line = $process.StandardError.ReadLine()
    if ($line -like "*https://*.trycloudflare.com*") {
        $link = ($line -split "\|")[1].Trim()
        break
    }
}

if ($link) {
    Write-Host "Success! Opening your link: $link" -ForegroundColor Green
    Start-Process $link
    Start-Sleep -Seconds 2
    # Minimize the terminal window
    $wshell = New-Object -ComObject WScript.Shell
    $wshell.AppActivate("Keiki's Cakes Live Preview")
    $wshell.SendKeys("% n") 
} else {
    Write-Host "Failed to capture link automatically. Check the window." -ForegroundColor Red
}

while (!$process.HasExited) { Start-Sleep -Seconds 5 }
