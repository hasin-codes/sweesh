// use tauri::Manager;

#[tauri::command]
async fn request_microphone_permission() -> Result<bool, String> {
  // On Windows, we can request microphone permission through the system
  // This is a simplified approach - in a real app you'd use proper Windows APIs
  Ok(true) // For now, assume permission is granted
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  // no secondary window at startup; created on-demand from the frontend

  tauri::Builder::default()
    .plugin(tauri_plugin_store::Builder::default().build())
    .invoke_handler(tauri::generate_handler![request_microphone_permission])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
