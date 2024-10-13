# Mom Said 🗺️📱

Mom Said is a location-based reminder app that helps you remember tasks your mom (or anyone else) asked you to do when you're near a specific location. Never forget to pick up groceries or run errands again!

## Features ✨

- Add location-based reminders
- Set time ranges for reminders
- Receive notifications when you're near the specified location
- Delete completed tasks

## How It Works

1. Add a new reminder by clicking the "+" button
2. Enter the task details (e.g., "buy vegetables and shoes")
3. Select the location on the map where you need to complete the task
4. Set a time range for when you want to receive reminders (optional)
5. When you're near the specified location, you'll receive a notification reminding you of the task

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Bun](https://bun.sh/) - A fast all-in-one JavaScript runtime
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for Android development)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/Sushants-Git/Mom-Said.git
   ```

2. Navigate to the project directory:
   ```
   cd Mom-Said
   ```

3. Install dependencies using Bun:
   ```
   bun install
   ```

4. Open the project in Android Studio

5. Run the app on an Android device or emulator:
   ```
   bunx expo run:android -d --no-build-cache
   ```

   Note: The `--no-build-cache` flag ensures a clean build. You may omit this flag for subsequent runs to speed up the process. ⚡

## Usage 📱

### Adding a Reminder

1. Open the app
2. Click the "+" button
3. Enter the task details
4. Click "Select location on map"
5. Choose the location on the map
6. Set a time range for the reminder
7. Click "Add location"

### Receiving Reminders 🔔

The app will run in the background and send you notifications when you're near the locations you've set for your tasks, in the specified time range.

### Deleting a Reminder ❌

After completing a task, you can delete the reminder from the main screen of the app, to stop getting the specified reminder.

## Technical Details

- Built for Android using React Native and Expo
- Uses Google Maps API for location services
- Implements background location tracking
- Utilizes Android's notification system

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request. We have a list of issues and improvements we're working on. Feel free to tackle any of these or suggest new ones:

- [ ] Making animations better and smoother
- [ ] Testing the app on iOS
- [ ] Implementing better dialog and clock models
- [ ] Improving app performance and reducing battery usage
- [ ] Adding multi-language support for wider accessibility

If you're interested in contributing but not sure where to start, check out the [Issues](https://github.com/Sushants-Git/Mom-Said/issues) page on our GitHub repository.

## License

[MIT License](https://github.com/Sushants-Git/Mom-Said?tab=MIT-1-ov-file#readme)

## Troubleshooting

If you encounter any issues during installation or running the app, please check the following:

1. Ensure all prerequisites are correctly installed and up to date.
2. Make sure you have the latest version of the code from the repository.
3. Try cleaning the project and rebuilding:
   ```
   bunx expo clean
   bun install
   bunx expo run:android -d --no-build-cache
   ```

If problems persist, please open an issue here with details about the error and your environment.

## Acknowledgments

- Created as part of the MLH Open Source Hackfest
- Inspired by forgetful people everywhere and the moms who never forget to remind us!
