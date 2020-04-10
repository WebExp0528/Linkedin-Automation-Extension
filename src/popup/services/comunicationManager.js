import ext from "../../utils/ext";

export default function sendMessage(data, callback = () => {}) {
    ext.tabs.query({ active: true, currentWindow: true }, tabs => {
        const activeTab = tabs[0];
        ext.tabs.sendMessage(activeTab.id, data, callback);
    });
}
