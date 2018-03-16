const {dialog} = require('electron')
const {autoUpdater} = require('electron-updater')

autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

autoUpdater.autoDownload = false

exports.check = () => {
    autoUpdater.logger.info("message from updater")
    console.log("Check for updates")
    autoUpdater.checkForUpdates()

    autoUpdater.on('update-available', () => {

        let downloadProgress = 0

        dialog.showMessageBox({
            type: 'info',
            title: 'update available',
            message: 'New version available',
            buttons: ['Update', 'No']
        }, (buttonIndex) => {
            if (buttonIndex !== 0) return
            autoUpdater.downloadUpdate()

            autoUpdater.on('download-progress', (d) => {
                downloadProgress = d.percent

                autoUpdater.logger.info(downloadProgress)
            })
        })
    })
}