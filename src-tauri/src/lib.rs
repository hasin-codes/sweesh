use tauri::Manager;

#[tauri::command]
async fn request_microphone_permission() -> Result<bool, String> {
  // On Windows, we can request microphone permission through the system
  // This is a simplified approach - in a real app you'd use proper Windows APIs
  Ok(true) // For now, assume permission is granted
}

#[tauri::command]
async fn show_floating_widget(app: tauri::AppHandle) -> Result<(), String> {
  let window = app.get_webview_window("floating").ok_or("Floating window not found")?;
  
  // Position the window on the right side of the screen
  if let Ok(monitor) = window.primary_monitor() {
    if let Some(monitor) = monitor {
      let screen_width = monitor.size().width as f64;
      let screen_height = monitor.size().height as f64;
      let x = screen_width - 200.0; // 190 width + 10 margin
      let y = (screen_height - 64.0) / 2.0; // Center vertically
      let _ = window.set_position(tauri::Position::Logical(tauri::LogicalPosition::new(x, y)));
    }
  }
  window.show().map_err(|e| e.to_string())?;
  window.set_focus().map_err(|e| e.to_string())?;
  Ok(())
}

#[tauri::command]
async fn hide_floating_widget(app: tauri::AppHandle) -> Result<(), String> {
  let window = app.get_webview_window("floating").ok_or("Floating window not found")?;
  window.hide().map_err(|e| e.to_string())?;
  Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  // no secondary window at startup; created on-demand from the frontend

  tauri::Builder::default()
    .plugin(tauri_plugin_store::Builder::default().build())
    .invoke_handler(tauri::generate_handler![
      request_microphone_permission,
      show_floating_widget,
      hide_floating_widget
    ])
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
